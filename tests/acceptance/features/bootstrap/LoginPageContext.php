<?php

/**
 *
 * @copyright Copyright (c) 2017, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use PHPUnit\Framework\Assert;

class LoginPageContext implements Context, ActorAwareInterface {
	use ActorAware;

	/**
	 * @var FeatureContext
	 */
	private $featureContext;

	/**
	 * @var FilesAppContext
	 */
	private $filesAppContext;

	public static function userNameField(): Locator {
		return Locator::forThe()->field("user")->
				describedAs("User name field in Login page");
	}

	public static function passwordField(): Locator {
		return Locator::forThe()->field("password")->
				describedAs("Password field in Login page");
	}

	public static function loginButton(): Locator {
		return Locator::forThe()->css(".button-vue[type='submit']")->
				describedAs("Login button in Login page");
	}

	public static function wrongPasswordMessage(): Locator {
		return Locator::forThe()->xpath("//*[@class = 'input-field__helper-text-message input-field__helper-text-message--error' and normalize-space() = 'Wrong username or password.']")->
				describedAs("Wrong password message in Login page");
	}

	/**
	 * @return Locator
	 */
	public static function userDisabledMessage() {
		return Locator::forThe()->xpath("//*[@class = 'input-field__helper-text-message input-field__helper-text-message--error' and normalize-space() = 'User disabled']")->
				describedAs('User disabled message on login page');
	}

	/**
	 * @When I log in with user :user and password :password
	 */
	public function iLogInWithUserAndPassword(string $user, string $password): void {
		$this->actor->find(self::userNameField(), 10)->setValue($user);
		$this->actor->find(self::passwordField())->setValue($password);
		$this->actor->find(self::loginButton())->click();
	}

	/**
	 * @Then I see that the current page is the Login page
	 */
	public function iSeeThatTheCurrentPageIsTheLoginPage() {
		Assert::assertStringStartsWith(
			$this->actor->locatePath("/login"),
			$this->actor->getSession()->getCurrentUrl());
	}

	/**
	 * @Then I see that a wrong password message is shown
	 */
	public function iSeeThatAWrongPasswordMessageIsShown() {
		Assert::assertTrue(
			$this->actor->find(self::wrongPasswordMessage(), 10)->isVisible());
	}

	/**
	 * @Then I see that the disabled user message is shown
	 */
	public function iSeeThatTheDisabledUserMessageIsShown() {
		Assert::assertTrue(
			$this->actor->find(self::userDisabledMessage(), 10)->isVisible());
	}

	/**
	 * @BeforeScenario
	 */
	public function getOtherRequiredSiblingContexts(BeforeScenarioScope $scope) {
		$environment = $scope->getEnvironment();

		$this->featureContext = $environment->getContext("FeatureContext");
		$this->filesAppContext = $environment->getContext("FilesAppContext");
	}

	/**
	 * @Given I am logged in
	 */
	public function iAmLoggedIn() {
		$this->featureContext->iVisitTheHomePage();
		$this->iLogInWithUserAndPassword("user0", "123456acb");
		$this->filesAppContext->iSeeThatTheCurrentPageIsTheFilesApp();
	}

	/**
	 * @Given I am logged in as :userName
	 */
	public function iAmLoggedInAs($userName) {
		$this->featureContext->iVisitTheHomePage();
		$this->iLogInWithUserAndPassword($userName, "123456acb");
		$this->filesAppContext->iSeeThatTheCurrentPageIsTheFilesApp();
	}

	/**
	 * @Given I am logged in as the admin
	 */
	public function iAmLoggedInAsTheAdmin() {
		$this->featureContext->iVisitTheHomePage();
		$this->iLogInWithUserAndPassword("admin", "admin");
		$this->filesAppContext->iSeeThatTheCurrentPageIsTheFilesApp();
	}

	/**
	 * @Given I can not log in with user :user and password :password
	 */
	public function iCanNotLogInWithUserAndPassword($user, $password) {
		$this->featureContext->iVisitTheHomePage();
		$this->iLogInWithUserAndPassword($user, $password);
		$this->iSeeThatTheCurrentPageIsTheLoginPage();
		$this->iSeeThatAWrongPasswordMessageIsShown();
	}
}
