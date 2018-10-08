package org.project.cims.management.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.database.credentials.dto.LoginCredentials;
import org.project.cims.management.model.AllUsers;
import org.project.cims.management.model.LoginModel;
import org.project.cims.management.service.LoginService;

@Path("/user")
public class ValidateUser extends SessionFactoryCreator {
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String validation(LoginModel log){
		return new LoginService().validateCredentials(log, session);
	}
	
	@POST
	@Path("/submit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String createUser(LoginModel log){
		return new LoginService().createUser(log,session);
	}
	
	@GET
	@Path("/fetchAll")
	@Produces(MediaType.APPLICATION_JSON)
	public AllUsers getAllUsers() {
		return new LoginService().getAllUsers(session);
	}
	
	@DELETE
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String deleteMultipleUsers(List<LoginCredentials> users) {
		return new LoginService().deleteUsers(users, session);
	}
	
	@GET
	@Path("/{eid}")
	@Produces(MediaType.TEXT_PLAIN)
	public String getuserById(@PathParam("eid") int eid){
		return new LoginService().getUserById(eid, session);
	}

}
