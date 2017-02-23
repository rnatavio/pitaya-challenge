package com.challenge.twitter;

import java.util.List;
import javax.inject.Inject;

import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.twitter.api.CursoredList;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.social.twitter.api.TwitterProfile;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class HomeController {

    private Twitter twitter;

    private ConnectionRepository connectionRepository;

    @Inject
    public HomeController(Twitter twitter, ConnectionRepository connectionRepository) {
        this.twitter = twitter;
        this.connectionRepository = connectionRepository;
    }

    @RequestMapping(value="/showTweets", method=RequestMethod.GET)
    public String helloTwitter(Model model) {
		List<Tweet> tweets = twitter.timelineOperations().getUserTimeline("Optus");
		model.addAttribute("tweets", tweets);
        return "tweets";
    }
	
	@RequestMapping(value = "/")
	public String index() {
        return "index";
	}

}
// end::code[]