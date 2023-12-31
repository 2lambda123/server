<?php

declare(strict_types=1);

/**
 * @copyright 2023 Christopher Ng <chrng8@gmail.com>
 *
 * @author Christopher Ng <chrng8@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\FilesReminders\Notification;

use InvalidArgumentException;
use OCA\FilesReminders\AppInfo\Application;
use OCA\FilesReminders\Exception\NodeNotFoundException;
use OCA\FilesReminders\Service\ReminderService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Files\FileInfo;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
use OCP\Notification\IAction;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;

class Notifier implements INotifier {
	public function __construct(
		protected IFactory $l10nFactory,
		protected IURLGenerator $urlGenerator,
		protected ReminderService $reminderService,
	) {}

	public function getID(): string {
		return Application::APP_ID;
	}

	public function getName(): string {
		return $this->l10nFactory->get(Application::APP_ID)->t('File reminders');
	}

	/**
	 * @throws InvalidArgumentException
	 */
	public function prepare(INotification $notification, string $languageCode): INotification {
		$l = $this->l10nFactory->get(Application::APP_ID, $languageCode);

		if ($notification->getApp() !== Application::APP_ID) {
			throw new InvalidArgumentException();
		}

		switch ($notification->getSubject()) {
			case 'reminder-due':
				$reminderId = (int)$notification->getObjectId();
				try {
					$reminder = $this->reminderService->get($reminderId);
				} catch (DoesNotExistException $e) {
					throw new InvalidArgumentException();
				}

				try {
					$node = $reminder->getNode();
				} catch (NodeNotFoundException $e) {
					throw new InvalidArgumentException();
				}
				$path = rtrim($node->getPath(), '/');
				if (strpos($path, '/' . $notification->getUser() . '/files/') === 0) {
					// Remove /user/files/...
					$fullPath = $path;
					[,,, $path] = explode('/', $fullPath, 4);
				}

				$link = $this->urlGenerator->linkToRouteAbsolute(
					'files.viewcontroller.showFile',
					['fileid' => $node->getId()],
				);

				// TRANSLATORS The name placeholder is for a file or folder name
				$subject = $l->t('Reminder for {name}');
				$notification
					->setRichSubject(
						$subject,
						[
							'name' => [
								'type' => 'highlight',
								'id' => $node->getId(),
								'name' => $node->getName(),
							],
						],
					)
					->setLink($link);

				$label = match ($node->getType()) {
					FileInfo::TYPE_FILE => $l->t('View file'),
					FileInfo::TYPE_FOLDER => $l->t('View folder'),
				};

				$this->addActionButton($notification, $label);
				break;
			default:
				throw new InvalidArgumentException();
				break;
		}

		return $notification;
	}

	protected function addActionButton(INotification $notification, string $label): void {
		$action = $notification->createAction();

		$action->setLabel($label)
			->setParsedLabel($label)
			->setLink($notification->getLink(), IAction::TYPE_WEB)
			->setPrimary(true);

		$notification->addParsedAction($action);
	}
}
