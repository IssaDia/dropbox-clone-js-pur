import { RegisterInterface } from "../RegisterInterface";

class GoogleAuth implements RegisterInterface {
  public static async register() {
    const response = await fetch(
      `${process.env.BACKEND_URL_ENDPOINT}/api/google_auth` || ""
    );
    console.log(response);

    //   const oauth2Endpoint = process.env.OAUTH2ENDPOINT || "";
    //   const clientId = process.env.CLIENTID || "";
    //   const redirectUri = process.env.REDIRECTURI || "";
    //   console.log(redirectUri, clientId);
    //   if (!clientId || !redirectUri) {
    //     console.error("Missing required environment variables.");
    //     return;
    //   }
    //   let form = document.createElement("form");
    //   form.setAttribute("method", "GET");
    //   form.setAttribute("action", oauth2Endpoint);
    //   let params = {
    //     client_id: clientId,
    //     redirect_uri: redirectUri,
    //     response_type: "token",
    //     scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    //     include_granted_scopes: "true",
    //     state: this.generateState(),
    //   };
    //   for (const [key, value] of Object.entries(params)) {
    //     const input = document.createElement("input");
    //     input.setAttribute("type", "hidden");
    //     input.setAttribute("name", key);
    //     input.setAttribute("value", value);
    //     form.appendChild(input);
    //   }
    //   document.body.appendChild(form);
    //   form.submit();
    //   return;
    // }
    // private generateState(): string {
    //   // Génère un nonce ou un identifiant unique pour la validation
    //   return Math.random().toString(36).substring(2); // Ex: "abc123"
    // }
  }

  public logout() {}
}

export default GoogleAuth;
