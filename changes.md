### Detailed JSDoc Comments:

1. Type Definition TConsoleOutput:

   - Describes the structure of the console output with type, message, and optional where properties.

2. Function captureConsole:

   - Captures all console method calls and logs their output with a stack trace.

3. Function captureErrors:

   - Captures unhandled errors and promise rejections, adding them to the output.

4. Function captureNetwork:

   - Captures network requests and responses using Proxy.

5. Function addNetworkLog:

   - Adds network request details to the captured output.

6. Function getOutput:

   - Returns the array of captured console output.

7. Function getLogMessages:

   - Returns the log messages with an option to skip the last log message.

8. Function restoreConsole:

   - Restores the original console methods.

9. Function getStackTrace:
   - Retrieves the current stack trace for location information.
10. Function initializeConsoleCapture:
    - Initializes the console capturing functionalities.
