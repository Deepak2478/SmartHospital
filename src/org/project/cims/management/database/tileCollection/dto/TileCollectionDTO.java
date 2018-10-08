package org.project.cims.management.database.tileCollection.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TileCollectionDTO {

	@Id
	private String title;
	@Column(nullable=true)
	private String icon;
	@Column(nullable=true)
	private String number;
	@Column(nullable=true)
	private String id_title;
	@Column(nullable=true)
	private String info;
	@Column(nullable=true)
	private String infoState;
	
	
	public String getId_title() {
		return id_title;
	}
	public void setId_title(String id_title) {
		this.id_title = id_title;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		if(icon == null)
			this.icon = "";
		this.icon = icon;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		if(number == null)
			this.number = "";
		this.number = number;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		if(title == null)
			this.title = "";
		this.title = title;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		if(info == null)
			this.info="";
		this.info = info;
	}
	public String getInfoState() {
		return infoState;
	}
	public void setInfoState(String infoState) {
		if(infoState == null)
			this.infoState = "";
		this.infoState = infoState;
	}
	
	
}
