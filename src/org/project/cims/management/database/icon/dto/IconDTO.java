package org.project.cims.management.database.icon.dto;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class IconDTO {

	@Id
	private String iconName;

	public String getIconName() {
		return iconName;
	}

	public void setIconName(String iconName) {
		this.iconName = iconName;
	}
	
}
