const { exit } = require('process');
const http = require('request');
const fs = require('fs');
var CurrentTime = new Date().getTime();
var _Arg1 = process.argv[2]; // Argument 1
var _Arg2 = process.argv[3]; // Argument 2
var _Arg3 = process.argv[4]; // Argument Type of Execution
FileName =`${CurrentTime}-RealName`
function isLinuxServer(string) { if (string.indexOf('win32') > -1) {    return "Windows";}else{    return "Linux";}}
function log(string) { console.log(string);}
function _exit() {process.exit();}
function _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms));}


function _RequestSearch(_CurrentID, body) { 
    var likedRatings = []
    var dislikedRatings = []
    var totalComments = 0
    var currentHighLikedRating = 0
    var currentViewCount = 0
    var totalRecommended = 0 
    var totalNotRecommended = 0
    var howManyPeopleReplied = 0
    var _serverJSONData = JSON.parse(body);
    topiclistings = _serverJSONData['topic_list']
    if (topiclistings['topics'].length == 0) {
        log(`Error..................: There have been no reviews for this server. Please try again later.`)
        _exit()
    }
    for (i in topiclistings['topics']) {
        howManyPeopleReplied++
        var ViewCount = topiclistings['topics'][i]['views']
        var AgreedCount = topiclistings['topics'][i]['like_count']
        var Title = topiclistings['topics'][i]['title']
        var Excerpt = topiclistings['topics'][i]['excerpt']
        var isRecomended = topiclistings['topics'][i]['tags'][0]
        var UserID = topiclistings['topics'][i]['posters'][0]['user_id']
        totalComments++
        var _data = {'ID': UserID,'ViewCount': ViewCount,'AgreedCount': AgreedCount,'Title': Title,'Excerpt': Excerpt}               
        if (isRecomended == 'recommended') {
            totalRecommended++
            likedRatings.push(_data)
            isRecomendedServer = true 
        }else{
            totalNotRecommended++
            dislikedRatings.push(_data)
            isRecomendedServer = false
        }
    }
    DislikedValueRatio = (totalNotRecommended / totalComments) * 100
    DislikedValueRatio = Math.round(DislikedValueRatio)
    LikeValueRatio = (totalRecommended / totalComments) * 100
    LikeValueRatio = Math.round(LikeValueRatio)
    log(`Notice.................: Some reviews may be (not so good and trustworthy) due to the fact that they misclick the rating button.`)
    log(`Dislike Percentage.....: ${DislikedValueRatio}% | ${totalNotRecommended}`)
    log(`Like Percentage........: ${LikeValueRatio}% | ${totalRecommended}`)
    if (LikeValueRatio > DislikedValueRatio) {
        var SubTract = (LikeValueRatio - DislikedValueRatio) + totalComments / 30
        for (i in likedRatings) {
            if (likedRatings[i]['AgreedCount'] >= currentHighLikedRating && likedRatings[i]['ViewCount'] >= currentViewCount) {
                var currentHighLikedRating = likedRatings[i]['AgreedCount']
                var currentViewCount = likedRatings[i]['ViewCount']
                // Player Information
                var CreatedBy = likedRatings[i]['ID']
                var Title = likedRatings[i]['Title']
                var Excerpt = likedRatings[i]['Excerpt']
            }
        }
        if (SubTract > totalComments) {
            log(`Final Verdict..........: Recommended`)
            log(`Most Liked Title.......: ${Title}`)
            log(`Excerpt................: ${Excerpt}`)
            log(`Posted By..............: ${CreatedBy}`)
        }else{
            log(`Final Verdict..........: Recommended/Not Recommended`)
            log(`Most Liked Title.......: ${Title}`)
            log(`Excerpt................: ${Excerpt}`)
            log(`Posted By..............: ${CreatedBy}`)
        }
    }else if (LikeValueRatio < DislikedValueRatio) {
        var SubTract = (DislikedValueRatio - LikeValueRatio) + totalComments / 30
        for (i in dislikedRatings) {
            if (dislikedRatings[i]['AgreedCount'] >= currentHighLikedRating && dislikedRatings[i]['ViewCount'] >= currentViewCount) {
                var currentHighLikedRating = likedRatings[i]['AgreedCount']
                var currentViewCount = likedRatings[i]['ViewCount']
                // Player Information
                var CreatedBy = likedRatings[i]['ID']
                var Title = likedRatings[i]['Title']
                var Excerpt = likedRatings[i]['Excerpt']
            }
        }
        if (SubTract > totalComments) {
            log(`Final Verdict..........: Not Recommended`)
            log(`Most Liked Title.......: ${Title}`)
            log(`Excerpt................: ${Excerpt}`)
            log(`Posted By..............: ${CreatedBy}`)
        }else{
            log(`Final Verdict..........: Recommended/Not Recommended`)
            log(`Most Liked Title.......: ${Title}`)
            log(`Excerpt................: ${Excerpt}`)
            log(`Posted By..............: ${CreatedBy}`)
        }

    }
}





async function _Execute(ServerID) { 
    var headers = {	'Content-Type': 'application/json',	'Accept-Encoding': 'gzip','user-agent': 'Mozilla/5.0'};
    var options = {url: `https://forum.cfx.re/tags/c/server-reviews/76/${ServerID}.json?ascending=true&order=activity.json`,method: 'GET',headers: headers,gzip: true};
    var _CheckFailed = false
    http(options, function(error, response, body) {
        var _CurrentID = ServerID
        if (!error && response.statusCode == 200) {
            _RequestSearch(_CurrentID, body)
        }else{
            log(`Error..................: Not a valid server ID or the server is not listed on the forum.`)
        }
    });
}
_Execute(_Arg1)