
export const ERROR_PREFIX = "ABLDR";

export interface ErrorDescriptor {
  number: number;
  // Message can use templates. See applyErrorMessageTemplate
  message: string;
  // Title and description can be Markdown
  title: string;
  description: string;
}

export function getErrorCode(error: ErrorDescriptor): string {
  return `${ERROR_PREFIX}${error.number}`;
}

export const ERROR_RANGES = {
  GENERAL: { min: 0, max: 99, title: "General errors" },
  NETWORK: { min: 100, max: 199, title: "Network related errors" },
  TASK_DEFINITIONS: {
    min: 200,
    max: 299,
    title: "Task definition errors",
  },
  ARGUMENTS: { min: 300, max: 399, title: "Arguments related errors" },
  PLUGINS: { min: 800, max: 899, title: "Plugin system errors" }
};

export const ERRORS: {
  [category in keyof typeof ERROR_RANGES]: {
    [errorName: string]: ErrorDescriptor;
  };
} = {
  GENERAL: {
    NOT_INSIDE_PROJECT: {
      number: 1,
      message: "You are not inside a Builder project.",
      title: "You are not inside a Builder project",
      description: `You are trying to run Builder outside of a Builder project.

You can learn hoy to use Builder by reading the [Getting Started guide](./README.md).`,
    },
    INVALID_NODE_VERSION: {
      number: 2,
      message:
        "Builder doesn't support your Node.js version. It should be %requirement%.",
      title: "Unsupported Node.js",
      description: `Builder doesn't support your Node.js version.

Please upgrade your version of Node.js and try again.`,
    },
    UNSUPPORTED_OPERATION: {
      number: 3,
      message: "%operation% is not supported in Builder.",
      title: "Unsupported operation",
      description: `You are tying to perform an unsupported operation.

Unless you are creating a task or plugin, this is probably a bug.

Please [report it](https://github.com/nomiclabs/builder/issues/new) to help us improve Builder.`,
    },
    CONTEXT_ALREADY_CREATED: {
      number: 4,
      message: "BuilderContext is already created.",
      title: "Builder was already initialized",
      description: `Builder initialization was executed twice. This is a bug.

Please [report it](https://github.com/nomiclabs/builder/issues/new) to help us improve Builder.`,
    },
    CONTEXT_NOT_CREATED: {
      number: 5,
      message: "BuilderContext is not created.",
      title: "Builder wasn't initialized",
      description: `Builder initialization failed. This is a bug.

Please [report it](https://github.com/nomiclabs/builder/issues/new) to help us improve Builder.`,
    },
    CONTEXT_BRE_NOT_DEFINED: {
      number: 6,
      message:
        "Builder Runtime Environment is not defined in the BuilderContext.",
      title: "Builder Runtime Environment not created",
      description: `Builder initialization failed. This is a bug.

Please [report it](https://github.com/nomiclabs/builder/issues/new) to help us improve Builder.`,
    },
    CONTEXT_BRE_ALREADY_DEFINED: {
      number: 7,
      message:
        "Builder Runtime Environment is already defined in the BuilderContext",
      title: "Tried to create the Builder Runtime Environment twice",
      description: `The Builder initialization process was executed twice. This is a bug.

Please [report it](https://github.com/nomiclabs/builder/issues/new) to help us improve Builder.`,
    },
    INVALID_CONFIG: {
      number: 8,
      message: `There's one or more errors in your config file:

%errors%

To learn more about Builder's configuration, please go to https://builder.dev/config/`,
      title: "Invalid Builder config",
      description: `You have one or more errors in your config file.

Check the error message for details, or go to [documentation](https://builder.dev/config/) to learn more.`,
    },
    LIB_IMPORTED_FROM_THE_CONFIG: {
      number: 9,
      message: `Error while loading Builder's configuration.
You probably imported @nomiclabs/builder instead of @nomiclabs/builder/config`,
      title: "Failed to load config file",
      description: `There was an error while loading your config file.

The most common source of errors is trying to import \`@nomiclabs/builder\` instead of \`@nomiclabs/builder/config\`.

Please make sure your config file is correct.`,
    },
    USER_CONFIG_MODIFIED: {
      number: 10,
      message: `Error while loading Builder's configuration.
You or one of your plugins is trying to modify the userConfig.%path% value from a config extender`,
      title: "Attempted to modify the user's config",
      description: `An attempt to modify the user's config was made.

This is probably a bug in one of your plugins.

Please [report it](https://github.com/nomiclabs/builder/issues/new) to help us improve Builder.`,
    },
    INIT_INSIDE_PROJECT: {
      number: 11,
      message: "Builder project file was detected: '%clashingFile%'. Move the file or use an empty directory.",
      title: "Directory contains a builder file",
      description: `You are trying to run Builder in a directory that contains builder project file.`,
    },
  },
  NETWORK: {
    CONFIG_NOT_FOUND: {
      number: 100,
      message: "Network %network% doesn't exist",
      title: "Selected network doesn't exist",
      description: `You are trying to run Builder with a non-existent network.

Read the [documentation](https://builder.dev/config/#networks-configuration) to learn how to define custom networks.`,
    },
    INVALID_GLOBAL_CHAIN_ID: {
      number: 101,
      message:
        "Builder was set to use chain id %configChainId%, but connected to a chain with id %connectionChainId%.",
      title: "Connected to the wrong network",
      description: `Your config specifies a chain id for the network you are trying to used, but Builder detected anotherone.

Please make sure you are setting your config correctly.`,
    },
    /* DEPRECATED: This error only happened because of a misconception in Builder */
    DEPRECATED_INVALID_TX_CHAIN_ID: {
      number: 102,
      message:
        "Trying to send a tx with chain id %txChainId%, but Builder is connected to a chain with id %chainId%.",
      title: "Incorrectly send chainId in a transaction",
      description: `Builder sent the \`chainId\` field in a transaction.

Please [report it](https://github.com/nomiclabs/builder/issues/new) to help us improve Builder.`,
    },
    ETHSIGN_MISSING_DATA_PARAM: {
      number: 103,
      message: 'Missing "data" param when calling eth_sign.',
      title: "Missing `data` param when calling eth_sign.",
      description: `You called \`eth_sign\` with incorrect parameters.

Please check that you are sending a \`data\` parameter.`,
    },
    NOT_LOCAL_ACCOUNT: {
      number: 104,
      message:
        "Account %account% is not managed by the node you are connected to.",
      title: "Unrecognized account",
      description: `You are trying to send a transaction or sign some data with an
account not managed by your Ethereum node nor Builder.

Please double check your accounts and the \`from\` parameter in your RPC calls.`,
    },
    MISSING_TX_PARAM_TO_SIGN_LOCALLY: {
      number: 105,
      message: "Missing param %param% from a tx being signed locally.",
      title: "Missing transaction parameter",
      description: `You are trying to send a transaction with a locally managed
account, and some parameters are missing.

Please double check your transactions' parameters.`,
    },
    NO_REMOTE_ACCOUNT_AVAILABLE: {
      number: 106,
      message:
        "No local account was set and there are accounts in the remote node.",
      title: "No remote accounts available",
      description: `No local account was set and there are accounts in the remote node.

Please make sure that your Ethereum node has unlocked accounts.`,
    },
    INVALID_HD_PATH: {
      number: 107,
      message:
        "HD path %path% is invalid. Read about BIP32 to know about the valid forms.",
      title: "Invalid HD path",
      description: `An invalid HD/BIP32 derivation path was provided in your config.

Read the [documentation](https://builder.dev/config/#hd-wallet-config) to learn how to define HD accounts correctly.`,
    },
    INVALID_RPC_QUANTITY_VALUE: {
      number: 108,
      message:
        "Received invalid value `%value%` from/to the node's JSON-RPC, but a Quantity was expected.",
      title: "Invalid JSON-RPC value",
      description: `One of your transactions sent or received an invalid JSON-RPC QUANTITY value.

Please double check your calls' parameters and keep your Ethereum node up to date.`,
    },
    NODE_IS_NOT_RUNNING: {
      number: 109,
      message: `Cannot connect to the network %network%.
Please make sure your node is running, and check your internet connection and networks config`,
      title: "Cannot connect to the network",
      description: `Cannot connect to the network.

Please make sure your node is running, and check your internet connection and networks config.`,
    },
    NETWORK_TIMEOUT: {
      number: 110,
      message: `Network connection timed-out.
Please check your internet connection and networks config`,
      title: "Network timeout",
      description: `One of your JSON-RPC requests timed-out.

Please make sure your node is running, and check your internet connection and networks config.`,
    },
    INVALID_JSON_RESPONSE: {
      number: 111,
      message: "Invalid JSON-RPC response received: %response%",
      title: "Invalid JSON-RPC response",
      description: `One of your JSON-RPC requests received an invalid response.

Please make sure your node is running, and check your internet connection and networks config.`,
    },
    CANT_DERIVE_KEY: {
      number: 112,
      message:
        "Cannot derive key %path% from mnemonic '%mnemonic%.\nTry using another mnemonic or deriving less keys.",
      title: "Could not derive an HD key",
      description: `One of your HD keys could not be derived.

Try using another mnemonic or deriving less keys.`,
    },
  },
  TASK_DEFINITIONS: {
    PARAM_AFTER_VARIADIC: {
      number: 200,
      message:
        "Could not set positional param %paramName% for task %taskName% because there is already a variadic positional param and it has to be the last positional one.",
      title: "Could not add positional parameter",
      description: `Could add a positional param to your task because
there is already a variadic positional param and it has to be the last
positional one.

Please double check your task definitions.`,
    },
    PARAM_ALREADY_DEFINED: {
      number: 201,
      message:
        "Could not set param %paramName% for task %taskName% because its name is already used.",
      title: "Repeated param name",
      description: `Could not add a param to your task because its name is already used.

Please double check your task definitions.`,
    },
    PARAM_CLASHES_WITH_BUILDER_PARAM: {
      number: 202,
      message:
        "Could not set param %paramName% for task %taskName% because its name is used as a param for Builder.",
      title: "Builder and task param names clash",
      description: `Could not add a param to your task because its name is used as a param for Builder.

Please double check your task definitions.`,
    },
    MANDATORY_PARAM_AFTER_OPTIONAL: {
      number: 203,
      message:
        "Could not set param %paramName% for task %taskName% because it is mandatory and it was added after an optional positional param.",
      title: "Optional param followed by a required one",
      description: `Could not add param to your task because it is required and it was added after an optional positional param.

Please double check your task definitions.`,
    },
    OVERRIDE_NO_PARAMS: {
      number: 204,
      message:
        "Redefinition of task %taskName% failed. You can't change param definitions in an overridden task.",
      title: "Attempted to add params to an overridden task",
      description: `You can't change param definitions in an overridden task.

Please, double check your task definitions.`,
    },
    OVERRIDE_NO_MANDATORY_PARAMS: {
      number: 210,
      message:
        "Redefinition of task %taskName% failed. Unsupported operation adding mandatory (non optional) param definitions in an overridden task.",
      title: "Attempted to add mandatory params to an overridden task",
      description: `You can't add mandatory (non optional) param definitions in an overridden task.
The only supported param additions for overridden tasks are flags,
and optional params.

Please, double check your task definitions.`,
    },
    OVERRIDE_NO_POSITIONAL_PARAMS: {
      number: 211,
      message:
        "Redefinition of task %taskName% failed. Unsupported operation adding positional param definitions in an overridden task.",
      title: "Attempted to add positional params to an overridden task",
      description: `You can't add positional param definitions in an overridden task.
The only supported param additions for overridden tasks are flags,
and optional params.

Please, double check your task definitions.`,
    },
    OVERRIDE_NO_VARIADIC_PARAMS: {
      number: 212,
      message:
        "Redefinition of task %taskName% failed. Unsupported operation adding variadic param definitions in an overridden task.",
      title: "Attempted to add variadic params to an overridden task",
      description: `You can't add variadic param definitions in an overridden task.
The only supported param additions for overridden tasks are flags,
and optional params.

Please, double check your task definitions.`,
    },

    ACTION_NOT_SET: {
      number: 205,
      message: "No action set for task %taskName%.",
      title: "Tried to run task without an action",
      description: `A task was run, but it has no action set.

Please double check your task definitions.`,
    },
    RUNSUPER_NOT_AVAILABLE: {
      number: 206,
      message:
        "Tried to call runSuper from a non-overridden definition of task %taskName%",
      title: "`runSuper` not available",
      description: `You tried to call \`runSuper\` from a non-overridden task.

Please use \`runSuper.isDefined\` to make sure that you can call it.`,
    },
    DEFAULT_VALUE_WRONG_TYPE: {
      number: 207,
      message:
        "Default value for param %paramName% of task %taskName% doesn't match the default one, try specifying it.",
      title: "Default value has incorrect type",
      description: `One of your tasks has a parameter whose default value doesn't match the expected type.

Please double check your task definitions.`,
    },
    DEFAULT_IN_MANDATORY_PARAM: {
      number: 208,
      message:
        "Default value for param %paramName% of task %taskName% shouldn't be set.",
      title: "Required parameter has a default value",
      description: `One of your tasks has a required parameter with a default value.

Please double check your task definitions.`,
    },
    INVALID_PARAM_NAME_CASING: {
      number: 209,
      message:
        "Invalid param name %paramName% in task %taskName%. Param names must be camelCase.",
      title: "Invalid casing in parameter name",
      description: `Your parameter names must use camelCase.

Please double check your task definitions.`,
    },
  },
  ARGUMENTS: {
    INVALID_ENV_VAR_VALUE: {
      number: 300,
      message: "Invalid environment variable %varName%'s value: %value%",
      title: "Invalid environment variable value",
      description: `You are setting one of Builder arguments using an environment variable, but it has an incorrect value.
Please double check your environment variables.`,
    },
    INVALID_VALUE_FOR_TYPE: {
      number: 301,
      message: "Invalid value %value% for argument %name% of type %type%",
      title: "Invalid argument type",
      description: `One of your Builder or task's arguments has an invalid type.
Please double check your arguments.`,
    },
    INVALID_INPUT_FILE: {
      number: 302,
      message:
        "Invalid argument %name%: File %value% doesn't exist or is not a readable file.",
      title: "Invalid file argument",
      description: `One of your tasks expected a file as an argument, but you provided a
non-existent or non-readable file.
Please double check your arguments.`,
    },
    UNRECOGNIZED_TASK: {
      number: 303,
      message: "Unrecognized task %task%. Try running help task to get a list of possible tasks.",
      title: "Unrecognized task",
      description: `Tried to run a non-existent task.
Please double check the name of the task you are trying to run.`,
    },
    UNRECOGNIZED_COMMAND_LINE_ARG: {
      number: 304,
      message:
        "Unrecognised command line argument %argument%.\nNote that task arguments must come after the task name.",
      title: "Unrecognized command line argument",
      description: `Builder couldn't recognize one of your command line arguments.

This may be because you are writing it before the task name. It should come after it.
Please double check how you invoked Builder.`,
    },
    UNRECOGNIZED_PARAM_NAME: {
      number: 305,
      message: "Unrecognized param %param%",
      title: "Unrecognized param",
      description: `Builder couldn't recognize one of your tasks' parameters.

Please double check how you invoked Builder or run your task.`,
    },
    MISSING_TASK_ARGUMENT: {
      number: 306,
      message: "Missing task argument %param%",
      title: "Missing task argument",
      description: `You tried to run a task, but one of its required arguments was missing.
Please double check how you invoked Builder or run your task.`,
    },
    MISSING_POSITIONAL_ARG: {
      number: 307,
      message: "Missing positional argument %param%",
      title: "Missing task positional argument",
      description: `You tried to run a task, but one of its required arguments was missing.
Please double check how you invoked Builder or run your task.`,
    },
    UNRECOGNIZED_POSITIONAL_ARG: {
      number: 308,
      message: "Unrecognized positional argument %argument%",
      title: "Unrecognized task positional argument",
      description: `You tried to run a task with more positional arguments than needed.
Please double check how you invoked Builder or run your task.`,
    },
    REPEATED_PARAM: {
      number: 309,
      message: "Repeated parameter %param%",
      title: "Repeated task parameter",
      description: `You tried to run a task with a repeated parameter.
Please double check how you invoked Builder or run your task.`,
    },
    PARAM_NAME_INVALID_CASING: {
      number: 310,
      message: "Invalid param %param%. Command line params must be lowercase.",
      title: "Invalid casing in command line parameter",
      description: `You tried to run builder with a parameter with invalid casing. They must be lowercase.
Please double check how you invoked Builder.`,
    },
    INVALID_JSON_ARGUMENT: {
      number: 311,
      message: "Error parsing JSON value for argument %param%: %error%",
      title: "Invalid JSON parameter",
      description: `You tried to run a task with an invalid JSON parameter.
Please double check how you invoked Builder or run your task.`,
    },
  },
  PLUGINS: {
    NOT_INSTALLED: {
      number: 800,
      message: `Plugin %plugin% is not installed.
%extraMessage%Please run: npm install --save-dev%extraFlags% %plugin%`,
      title: "Plugin not installed",
      description: `You are trying to use a plugin that hasn't been installed.

Please follow Builder's instructions to resolve this.`,
    },
    MISSING_DEPENDENCY: {
      number: 801,
      message: `Plugin %plugin% requires %dependency% to be installed.
%extraMessage%Please run: npm install --save-dev%extraFlags% "%dependency%@%versionSpec%"`,
      title: "Plugin dependencies not installed",
      description: `You are trying to use a plugin with unmet dependencies.

Please follow Builder's instructions to resolve this.`,
    },
    DEPENDENCY_VERSION_MISMATCH: {
      number: 802,
      message: `Plugin %plugin% requires %dependency% version %versionSpec% but got %installedVersion%.
%extraMessage%If you haven't installed %dependency% manually, please run: npm install --save-dev%extraFlags% "%dependency%@%versionSpec%"
If you have installed %dependency% yourself, please reinstall it with a valid version.`,
      title: "Plugin dependencies's version mismatch",
      description: `You are trying to use a plugin that requires a different version of one of its dependencies.

Please follow Builder's instructions to resolve this.`,
    },
    OLD_STYLE_IMPORT_DETECTED: {
      number: 803,
      message: `You are trying to load %pluginNameText% with a require or import statement.
Please replace it with a call to usePlugin("%pluginNameCode%").`,
      title: "Importing a plugin with `require`",
      description: `You are trying to load a plugin with a call to \`require\`.

Please use \`usePlugin(npm-plugin-package)\` instead.`,
    },
  }
};