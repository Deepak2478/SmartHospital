package org.project.cims.management.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.project.cims.management.model.MeetingCollection;

@Path("/resources")
public class Placebo extends SessionFactoryCreator{

	@GET
	@Path("/unenc/meeting")
	@Produces(MediaType.APPLICATION_JSON)
	public MeetingCollection getMeeting(){
		return new MeetingCollection();
	}
	
	@GET
	@Path("/enc/")
	@Produces(MediaType.TEXT_PLAIN)
	public String getAnotherMeeting() {
		return "/%=211Dfg!`478^5g0)re|d.zap^$@=p;";
	}
}
