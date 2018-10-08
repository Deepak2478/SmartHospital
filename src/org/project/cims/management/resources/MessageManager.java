package org.project.cims.management.resources;

import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.database.messages.dto.MessagesDB;
import org.project.cims.management.model.MessageCollection;
import org.project.cims.management.service.MessageServices;

@Path("/messages")
public class MessageManager extends SessionFactoryCreator{

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addMessage(MessagesDB db){
		db.setDate(new Date().toString());
		return new MessageServices().addMessage(db, session);
	}
	
	@GET
	@Path("/{eid}")
	@Produces(MediaType.APPLICATION_JSON)
	public MessageCollection getMessages(@PathParam("eid") int eid){
		return new MessageServices().getMessageById(eid, session);
	}
	
	@GET
	@Path("/byId/{mid}")
	@Produces(MediaType.APPLICATION_JSON)
	public MessageCollection getMessage(@PathParam("mid") int mid){
		return new MessageServices().getMessage(mid, session);
	}
}
