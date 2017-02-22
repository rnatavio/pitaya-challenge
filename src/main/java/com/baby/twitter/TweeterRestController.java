package com.baby.twitter;

import java.util.List;
import javax.inject.Inject;

import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tweeter")
public class TweeterRestController {

    private Twitter twitter;

    private ConnectionRepository connectionRepository;

    @Inject
    public TweeterRestController(Twitter twitter, ConnectionRepository connectionRepository) {
        this.twitter = twitter;
        this.connectionRepository = connectionRepository;
    }
    
    @CrossOrigin(origins = "https://8080-dot-2269968-dot-devshell.appspot.com")
    @RequestMapping(method=RequestMethod.GET)
    public List<Tweet> showTweets() {
        return twitter.timelineOperations().getUserTimeline("Optus");
    }

}
// end::code[]