import mongoose from 'mongoose';

//a ts interface for the properties of ticket
interface TicketAttrs {
  title: string;
  price: number;
}

//a ts interface that describes properties
//of a Ticket Document returned from mongo
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
}

//a ts interface to describe what properties the model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  //returns an instance of the document
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  //this object is to customize json output of Ticket model
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

//this is a function to make ts work with mongoose
//statics is to add function to a schema
//this way we can call Ticket.build to create a new Ticket
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
