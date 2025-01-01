import { RegisterInterface } from "../RegisterInterface";

class MailAuth implements RegisterInterface {
 public static async register(formData: any): Promise<any> {
console.log(formData);
try {
    const response = await fetch("http://localhost:5001/api/auth/mail", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      // Récupération du token et des données utilisateur
      const { token, user } = data;

      // Stockage des données dans le localStorage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(user));

      // Redirection vers le dashboard après succès
      window.history.replaceState({}, document.title, "/dashboard");
      window.location.href = "/dashboard";
    } else {
      // Gestion des erreurs si la réponse n'est pas ok
      throw new Error(data.message || "Échec de l'enregistrement");
    }


  } catch (error) {
    console.error("Failed to initiate auth:", error);
   
  }
 
}

static async handleAuthCallback() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userStr = urlParams.get("user");

    if (!token || !userStr) {
      console.error("Token ou données utilisateur manquants");
      window.location.href = "/";
      return;
    }

    // Parser et stocker les données
    const user = JSON.parse(decodeURIComponent(userStr));
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(user));

    // Nettoyage de l'URL et redirection
    window.history.replaceState({}, document.title, "/dashboard");
    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Erreur lors du callback d'authentification :", error);
    window.location.href = "/";
  }
}

static logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
  window.location.reload();
}

static isAuthenticated() {
  return localStorage.getItem("auth_token") !== null;
}

static getUserData() {
  try {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Erreur lors de l'analyse des données utilisateur :", error);
    return null;
  }
}

static async getToken() {
  try {
    const response = await fetch("http://localhost:5001/api/auth/token", {
      credentials: "include",
    });
    const data = await response.json();

    localStorage.setItem("auth_token", data.token);

    return data.token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    return null;
  }
}

 }


export default MailAuth