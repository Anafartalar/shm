const Dialogflow=require("../../dialogflow");
const Actions=require("./actions");


const process=async(ctx)=>{

    
    try {
        
        const dialogflow=new Dialogflow(ctx.message.from.id)

        let result = await dialogflow.detectIntent(ctx.message.text);

        let actionName=result.action;
        let allRequiredParamsPresent=result.allRequiredParamsPresent;
   
        actionName=Actions[actionName];// check if we are interested in this action

        if(!actionName || !allRequiredParamsPresent){
            return ctx.reply(result.fulfillmentText);
        }

        await actionName(ctx,result) // if the action is in our list, then allow it to handle the response

        
    } catch (error) {
        console.log(error)
        ctx.reply("Sorry, something went wrong 😢");
    }

};

module.exports={
    process
};


// smile "😄"