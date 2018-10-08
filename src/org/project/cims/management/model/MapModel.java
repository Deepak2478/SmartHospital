package org.project.cims.management.model;

import java.util.ArrayList;
import java.util.List;

import org.project.cims.management.database.meeting.dto.MeetingMap;

public class MapModel {
	
	private List<MeetingMap> participents = new ArrayList<MeetingMap>();

	public List<MeetingMap> getParticipents() {
		return participents;
	}

	public void setParticipents(List<MeetingMap> participents) {
		this.participents = participents;
	}	
}
