package com.challenge.twitter;

import java.util.List;
import javax.inject.Inject;

import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
    
    @RequestMapping(method=RequestMethod.GET)
    public List<Tweet> showTweets(@RequestParam("user") String user) {
        return twitter.timelineOperations().getUserTimeline(user);
    }

}