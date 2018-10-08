package org.project.cims.management.model;

import java.util.ArrayList;
import java.util.List;

import org.project.cims.management.database.icon.dto.IconDTO;

public class IconModel {

	private List<IconDTO> iconNames = new ArrayList<IconDTO>();

	public List<IconDTO> getIconNames() {
		return iconNames;
	}

	public void setIconNames(List<IconDTO> iconNames) {
		this.iconNames = iconNames;
	}
	
}
