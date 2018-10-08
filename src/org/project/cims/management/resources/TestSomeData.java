package org.project.cims.management.resources;

import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.model.DateModel;
import org.project.cims.management.model.TestingModel;

@Path("/testdata")
public class TestSomeData {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String input(TestingModel model){
		System.out.println("Post Method = Eid="+model.getEid()+", Ename="+model.getEname()+", Eaddr="+model.getEaddr());
		return "Success from POST";
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String putMethod(TestingModel model){
		System.out.println("Put Method = Eid="+model.getEid()+", Ename="+model.getEname()+", Eaddr="+model.getEaddr());
		return "Success from PUT";
	}
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteMethod(TestingModel model){
		System.out.println("DELETE Method = Eid="+model.getEid()+", Ename="+model.getEname()+", Eaddr="+model.getEaddr());
		return "Success from DELETE";
	}
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getMethod(){
		System.out.println("Simple GET Method");
		return "Success from GET";
	}
	
	@GET
	@Path("/format")
	@Produces(MediaType.APPLICATION_JSON)
	public DateModel someMethod(){
		DateModel dt = new DateModel();
		dt.setDateNow(new Date());
		return dt;
	}
}
