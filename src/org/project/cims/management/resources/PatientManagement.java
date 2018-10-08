package org.project.cims.management.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.database.patient.dto.PatientDB;
import org.project.cims.management.model.PatientCollection;
import org.project.cims.management.model.PatientCountModel;
import org.project.cims.management.service.PatientService;

@Path("/patient")
public class PatientManagement extends SessionFactoryCreator{

	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addUser(PatientDB patient) {
		return new PatientService().addPatient(patient, session);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public PatientCollection getAllPatients() {
		return new PatientService().getAllPatients(session);
	}
	
	@Path("/num")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public PatientCountModel getPatientNumber(){
		PatientCountModel pcm=new PatientCountModel();
		PatientService ps = new PatientService();
		pcm.setAll(ps.getPatientNumber(session));
		pcm.setAdmitted(ps.getAdmittedPatients(session));
		pcm.setDischarged(ps.getDischargedPatients(session));
		pcm.setOverdue(ps.getOverduePatients(session));
		return pcm;
	}
}
