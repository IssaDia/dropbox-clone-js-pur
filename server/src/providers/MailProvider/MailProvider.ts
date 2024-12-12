import nodemailer from 'nodemailer';
import ejs from 'ejs';
import baseEmailTemplate from './templates/base.ejs';


class MailAuthProvider {
  
  private static instance: MailAuthProvider
  private transport

  static getInstance(): MailAuthProvider {
    if (!MailAuthProvider.instance) {
      MailAuthProvider.instance = new MailAuthProvider()
    }
    return MailAuthProvider.instance
  }

  constructor() {
       this.transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAILUSERNAME,
          pass: process.env.MAILPASSWORD
        }
      })
  }

    async sendMail (to : string, title: string, html: string){
      const messageHTML = await ejs.renderFile(baseEmailTemplate, {
        title,
        html,
        serverURL: process.env.SERVERURL,
        receiverEmail: to
      })
       return this.transport.sendMail({
        from: process.env.MAILUSERNAME,
        to,
        subject: title,
        html: messageHTML
       })
        
    }

}

export default MailAuthProvider