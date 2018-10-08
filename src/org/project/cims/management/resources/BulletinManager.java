package org.project.cims.management.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.database.bulletin.dto.BulletinDB;
import org.project.cims.management.model.BulletinCollection;
import org.project.cims.management.service.BulletinService;

@Path("/bulletin")
public class BulletinManager extends SessionFactoryCreator{

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addBulletin(BulletinDB db){
		System.out.println(db.getDepartment());
		return new BulletinService().addBulletin(db,session);
	}
	
	@GET
	@Path("/{eid}")
	@Produces(MediaType.APPLICATION_JSON)
	public BulletinCollection getMeetings(@PathParam("eid") int eid) {
		return new BulletinService().getBulletins(eid,session);
	}
	
	@GET
	@Path("/byid/{bid}")
	@Produces(MediaType.APPLICATION_JSON)
	public BulletinDB getBulletinById(@PathParam("bid") int bid){
		return new BulletinService().getBulletinById(bid, session);
	}
}
