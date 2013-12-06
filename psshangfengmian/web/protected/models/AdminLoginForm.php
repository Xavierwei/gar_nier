<?php

class AdminLoginForm extends CFormModel {
	public $username;
	public $password;

	public function rules() {
		return array(
			array("username, password", 'required'),
			array("password", "authenticate"),
		);
	}

	public function authenticate($attrs, $params) {
		if ($this->password != "x1Qzp(v!" || $this->username != "garnier") {
			return $this->addError("password", "user name or password is not right");
		}
	}

}