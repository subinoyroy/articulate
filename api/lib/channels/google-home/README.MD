# GOOGLE HOME CHANNEL

This connector will allow sending messages between Google Home and your agents

## Prerequisites

1. Download and install the [gactions CLI](https://developers.google.com/actions/tools/gactions-cli) tool.
2. Have a google acount to access [Google Actions console](https://console.actions.google.com).

## Agent Considerations (IMPORTANT)

### MAIN Google Action

You will create a channel that works a little bit different than Facebook Messenger, Twilio or Slack. Whenever a user is going to talk with your agent using google home, they will start with a query pattern to trigger the main action. It’s advised this main action should be answered with something like a greeting or welcome action.

So, if your user starts the Google Action by saying "Talk to My Awesome Agent" you should answer, "Hey there, how can I help you?" or something like that. Users could be more concise and say "Hey Google, ask my awesome agent, how is the weather in New York?," You would be most likely to directly respond to the request.

It’s recommended that you handle these cases by training the phrases in your agent sayings under the dialogue tab, and tagging them with the proper action. Whenever a user says, "Talk to my awesome agent," your agent will know how to handle that main intent. If you don't do this, your agent may direct the saying to a fallback response.

On step 5, you are going to see how query patterns are specified. Be sure to add the query patterns you specified in this step into your sayings tab, to train your agent with these phrases.

### FINAL Action

Articulate's actions can have an additional payload besides the user text, session id, and timezone. This payload will be useful in order to specify data that you could use to handle business logic or any other relevant stuff.

In the case for a Google Channel, we are going to use this additional payload to specify an attribute called: `closeGoogleActions`. Set its value to `true` in the action, where you want to close the conversation with the user.

You are going to find this additional payload in the Response tab of your action, under the title Response Format. You need to enable the toggle that is below the action's responses and specify the additional payload, as show in the next image:

![Google Actions Console main screen](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/12%20-%20Close%20Google%20Action.png)

Now, whenever this action is recognized by your agent, the proper response will be generated and your agent will send a `close` instruction to Google Home in order to close the mic. Google Home will then stop listening the user.

## Configuration

1. Enter to your Google Actions console and create a new project:

![Google Actions Console main screen](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/01%20-%20Google%20Actions%20Console.png)

![New project form](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/02%20-%20New%20Project.png)

2. Now that you have a project, it’s time to choose a development experience. Please select the Actions SDK option at the very end, and copy the Update app command that's going to be shown. Once you copy the command, click OK:

![Development Experience](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/03%20-%20New%20Project%20Screen.png)

![Actions SDK info](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/04%20-%20Copy%20command.png)

4. You now need to setup your Google Action. In the overview screen, click on *Decide how your Action is invoked*. In the next screen, specify your Display Name and hit SAVE:

![Google Action Overview](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/05%20-%20Decide%20display%20name.png)

![Set display name](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/06%20-%20Set%20display%20name.png)

5. Create a new connection in the Articulate UI between Google Home and your desired agent. Please fill the query patterns for Main Action in the *details* Tab. These patterns are the phrases that users will use to start a conversation with your Agent over Google Home. The Query Patterns should include your Google Action Display Name:

![New Google Home Connection](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/07%20-%20New%20Google%20Home%20Connection.png)

![Google Home Details](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/08%20-%20Query%20Patterns.png)

6. If you are ready with your query patterns, hit Save. You will then see a download button in the main tab of your new connection. The file that you downloaded when you click the button is the actions package that you are going to upload to your project. BUT!, before uploading your actions package you need to modify the url of your conversation details with the address of your public server where the Articulate API is running. This file already haves your connection route in the URL, but you need to replace "<YOUR API SERVER ADDRESS>" with the proper value. **YOUR ADDRESS MUST BE AN HTTPS SERVER, HTTP is not allowed**:


![Download actions package](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/09%20-%20Download%20Actions%20Package.png)

![Actions Package](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/10%20-%20Actions%20Package.png)

7. Now, it’s time to recover the command you copied in step 2. We will use the gactions CLI to upload our Actions Package. If you lost the command, don't worry, just replace this one with your *PACKAGE_NAME* and the *PROJECT_ID* that you can find in your Google Actions project settings:

`gactions update --action_package PACKAGE_NAME --project PROJECT_ID`

![Project ID](https://github.com/samtecspg/articulate/blob/master/api/lib/channels/google-home/screenshots/11%20-%20Project%20ID.png)

**Note:** This is probably the first time you are uploading an Actions Package to your project so you will need to authorize access to your Google account. Copy & paste the URL that your console shows you once you enter the gactions update command, then follow the steps and copy the authorization code and paste it into the console to finish the authorization process.

8. If everything went well, your actions were uploaded and you will be able to test your agent using your simulator, or a Google Home device connected with the same Google account that you use for your project.

9. Go and test your agent until you are sure you are ready to submit it to review. When Google approves, your agent will be publicly available.