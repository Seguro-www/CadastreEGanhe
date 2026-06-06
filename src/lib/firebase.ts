import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signInAnonymously
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Auth error:", error);
    if (error.code === 'auth/unauthorized-domain') {
       alert("Erro: Este domínio não está autorizado no Console do Firebase. Adicione o seu domínio da Locaweb em Authentication > Settings > Authorized Domains.");
    } else {
       alert("Erro ao fazer login: " + (error.message || "Tente novamente."));
    }
    throw error;
  }
}

export async function loginWithEmail(email: string, pass: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return result.user;
  } catch (error: any) {
    console.error("Email login error:", error);
    alert("Erro ao entrar com e-mail: " + (error.message || "Verifique suas credenciais."));
    throw error;
  }
}

export async function registerWithEmail(email: string, pass: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    return result.user;
  } catch (error: any) {
    console.error("Registration error:", error);
    alert("Erro ao cadastrar e-mail: " + (error.message || "Tente novamente."));
    throw error;
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("E-mail de recuperação enviado!");
  } catch (error: any) {
    console.error("Reset error:", error);
    alert("Erro ao recuperar senha: " + (error.message || "Tente novamente."));
    throw error;
  }
}

export async function signInWithAnonymous() {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error: any) {
    console.error("Anonymous sign in error:", error);
    alert("Erro ao entrar anonimamente: " + (error.message || "Tente novamente."));
    throw error;
  }
}

// Validation Connection to Firestore (Instruction: CRITICAL CONSTRAINT)
async function testConnection() {
  try {
    // Only attempt if we can get a doc reference (even if it doesn't exist)
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

if (typeof window !== 'undefined') {
  testConnection();
}
