/*** Inbenta chatbot SDK configuration and build ***/

    var inbApp = {
      // Inbenta chatbot SDK credentials
      sdkAuth: {
        inbentaKey: 'Ba9gAY2xZtnwv0YM6YXyHxwjNy+lzoimbdd4O6v8PBQ=',
        domainKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiYmlnYmVhcl9jaGF0Ym90X2VuIiwiZG9tYWluX2tleV9pZCI6IkJiRzdSN2lsNm5teXc1ZjRINS00Q0E6OiJ9.bvOjCyt03TN1VCG-wTp4BpFY_nTYxslDcOAuLmCeolPj6yN2cchfClfPcF0aXX2c6ffDfpZomTkgRI4cuMERJA'
      },
      // Inbenta chatbot SDK configuration
      sdkConfig: {
        chatbotId: 'incontact_chatbot',
        environment: 'production',
        userType: 0,
        lang: 'en',
        labels: {
          en: { 'interface-title': 'Big Bear Chat Support' }
        },
        closeButton: { visible: true },
        html: { 'custom-window-header': '<div></div>' },
        adapters: []
      },
      // Inbenta escalation adapters conf
      inbAppConfig: {
        noAgentsAvailable: {
          action: 'displayChatbotMessage',
          value: 'no-agents' // If value is 'no-agents' (default), this label will be translated or else, custom text can be set here too
        },
        rejectedEscalation: {
          action: 'displayChatbotMessage',
          value: 'What else can I help you with?' // If value is 'enter-question' (default), this label will be translated or else, custom text can be set here too
        },
        maxNotFound: 2,
        contentForm: 'ChatWithLiveAgentContactForm',

      },
      // Incontact Adapter conf
      incontactConf: {
        debugMode: true, //enable-disable debugmode for logs
        enabled: true, // Enable inContact escalation
        applicationName: 'BigBearChatBot',
        vendorName: 'Alterra',
        applicationSecret: 'YTkzM2UxZjFhMTg1NGNjNjhlYTAyNDcyNmE2MTEzOTk=',
        accessKeyId: '', //Get 'accessKeyId' and 'accessKeySecret' from an existing user (https://developer.niceincontact.com/Documentation/Createaccesskey)
        accessKeySecret: '',
        version: 'v12.0',
        agentWaitTimeout: 120, // seconds
        getMessageTimeout: 60, // seconds
        incontactSessionLifetime: 3, // minutes
        agent: {
          name: 'Live Agent', // Agent name
          avatarImage: '' // Agent avatar image soure (file or base64), if empty inContact image will be use
        },
        defaultUserName: 'User', //name displayed for user in incontact in case there is no form on escalate
        defaultChatbotName: 'Chatbot', //name displayed for chatbot messages in incontact 
        defaultSystemName: 'System', //name displayed for chatbot system messages in incontact 
        payload: {
          pointOfContact: '400dda67-adaa-4e03-a6b0-c836e19697e0',
          fromAddress: 'bot@bigbearmountainresort.com',
          chatRoomID: '',
          parameters: []
        }
      }
    }


    // Add adapters
    window.inbApp.sdkConfig.adapters.push(
      /*
       * InContact adapter must be pushed before escalation adapters
       * Uncomment below the escalation adatper to use
       */
      inbentaIncontactAdapter(inbApp.incontactConf),

      
      /*
       * Escalate to InContact with natural language form
       *  More info: https://developers.inbenta.io/chatbot/javascript-sdk/sdk-adapters/nl-escalation-adapter-2
       */
      window.SDKNLEscalation2(inbentaPromiseAgentsAvailableTrue)
    );

    InbentaChatbotSDK.buildWithDomainCredentials(inbApp.sdkAuth, inbApp.sdkConfig);
