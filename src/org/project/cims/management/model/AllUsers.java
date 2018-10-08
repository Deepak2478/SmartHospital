package org.project.cims.management.model;

import java.util.ArrayList;
import java.util.List;

import org.project.cims.management.database.credentials.dto.LoginCredentials;

public class AllUsers {
	
	private List<LoginCredentials> userNames = new ArrayList<LoginCredentials>();

	public List<LoginCredentials> getUserNames() {
		return userNames;
	}

	public void setUserNames(List<LoginCredentials> userNames) {
		this.userNames = userNames;
	}
}
