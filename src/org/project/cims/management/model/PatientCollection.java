package org.project.cims.management.model;

import java.util.ArrayList;
import java.util.List;

import org.project.cims.management.database.patient.dto.PatientDB;

public class PatientCollection {

	private List<PatientDB> patients = new ArrayList<PatientDB>();

	public List<PatientDB> getPatients() {
		return patients;
	}

	public void setPatients(List<PatientDB> patients) {
		this.patients = patients;
	}
	
}
