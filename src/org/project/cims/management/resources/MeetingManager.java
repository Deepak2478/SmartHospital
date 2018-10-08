package org.project.cims.management.resources;



import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


import org.project.cims.management.model.MapModel;
import org.project.cims.management.model.MeetingCollection;
import org.project.cims.management.model.MeetingModel;
import org.project.cims.management.service.LoginService;
import org.project.cims.management.service.MeetingService;

@Path("/meeting")
public class MeetingManager extends SessionFactoryCreator{

	
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addMeeting(MeetingModel db) {
		return new MeetingService().addMeeting(db, session);
	}
	
	@GET
	@Path("/{eid}")
	@Produces(MediaType.APPLICATION_JSON)
	public MeetingCollection getMeetingsByUser(@PathParam("eid") int eid) {
		if(eid == 0){
			return new MeetingService().getAllMeetings(session);
		}
		MeetingService meet = new MeetingService();
		return meet.getMeetingForUser(new LoginService().getUserById(eid, session), session);
	}
	
	@PUT
	@Path("/{username}/{mID}")
	@Consumes(MediaType.TEXT_PLAIN)
	public void updateWillAttend(@PathParam("username") String username,@PathParam("mID") int meetingId, boolean s) {
		System.out.println(username+""+meetingId+""+s);
		new MeetingService().updateMeeting(meetingId, username, s, session);
	}
	
	@GET
	@Path("/byId/{mid}")
	public MapModel getParticipants(@PathParam("mid") int mid){
		return new MeetingService().getParticipants(mid, session);
	}
	
}
