# How this works

Entrypoint will receive a call from the framework.

If the framework detects a command starting with the prefix defined in the Entrypoint class, it'll hand the control to the method `commandHandlers`. 
Else, it'll send the message to the `chatHandlers` method.

# Why the `commandsFilename` parameter?

The `commandsFilename` parameter allows the bot to autodocument itself. 

It creates a list of commands based of your code. This is only possible when you follow the same structure as [commands.js](commands.js).

You can also comment something like `// comment=""`. This way, you can call `Help.getHelp` method to get the description of that command.

