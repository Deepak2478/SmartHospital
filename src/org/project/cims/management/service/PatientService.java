package org.project.cims.management.service;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.project.cims.management.database.patient.dto.PatientDB;
import org.project.cims.management.model.PatientCollection;

public class PatientService {

	public PatientCollection getAllPatients(Session session) {
		PatientCollection pc= new PatientCollection();
		Query q = session.createQuery("from PatientDB");
		@SuppressWarnings("unchecked")
		List<PatientDB> patients = q.list();
		for(PatientDB d : patients){
			pc.getPatients().add(d);
		}
		return pc;
	}
	
	public String addPatient(PatientDB patient, Session session) {
		
		try{
			patient.setPid(10000000l+getPatientNumber(session)+"");
			if(patient.getDue()>= 5000){
				patient.setFav(true);
				patient.setLock(true);
				patient.setStatus("Overdue");
				patient.setState("Error");
			}
			else {
				patient.setFav(true);
				patient.setLock(false);
				patient.setStatus("Admitted");
				patient.setState("Success");
			}
			patient.setFlag(false);
			session.beginTransaction();
			session.save(patient);
			session.getTransaction().commit();
		}
		catch(Exception e){
			return "fail";
		}
		return "success";
	}
	public String updatePatient(PatientDB patient,Session session) {
		try{
			session.beginTransaction();
			session.update(patient);
			session.getTransaction().commit();
		}
		catch(Exception e){
			return "fail";
		}
		return "success";
	}
	
	public int getPatientNumber(Session session){
		Query q = session.createQuery("Select count(pid) from PatientDB");
		String s=q.list().toString();
		s=s.substring(1, s.length()-1);
		System.out.println("All:" +s);
		if(s == "")
			return 0;
		else
			return Integer.parseInt(s);
	}
	public int getAdmittedPatients(Session session){
		Query q = session.createQuery("Select count(pid) from PatientDB where status='Admitted'");
		String s=q.list().toString();
		s=s.substring(1, s.length()-1);
		System.out.println("Admitted:" +s);
		if(s == "")
			return 0;
		else
			return Integer.parseInt(s);
	}
	public int getOverduePatients(Session session){
		Query q = session.createQuery("Select count(pid) from PatientDB where status='Overdue'");
		String s=q.list().toString();
		s=s.substring(1, s.length()-1);
		System.out.println("Overdue:" +s);
		if(s == "")
			return 0;
		else
			return Integer.parseInt(s);
	}
	public int getDischargedPatients(Session session){
		Query q = session.createQuery("Select count(pid) from PatientDB where status='Discharged'");
		String s=q.list().toString();
		s=s.substring(1, s.length()-1);
		System.out.println("Discharged:" +s);
		if(s == "")
			return 0;
		else
			return Integer.parseInt(s);
	}
}
