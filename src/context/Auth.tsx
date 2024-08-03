// Auth.tsx
import { CognitoUser,CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUserSession, ISignUpResult } from "amazon-cognito-identity-js";
import { ReactNode, createContext, useContext, useState, useCallback, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

const UserPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
});

type State = {
  user: CognitoUser | null;
  signUp: (username: string, email: string, password: string) => Promise<ISignUpResult>;
  confirmSignUp: (username: string, code: string) => Promise<any>;
  resendConfirmationCode: (username: string) => Promise<any>;
  logIn: (username: string, password: string) => Promise<CognitoUserSession>;
  logOut: () => void;
  getSession: () => Promise<any>;
  forgotPassword: (username: string) => Promise<any>;
  passwordConfirm: (username: string, code: string, newPassword: string) => Promise<any>;
};

const AuthContext = createContext<State | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast()
  const [user, setUser] = useState<State["user"]>(null);
  const signUp = useCallback(
    async (username: string, email: string, password: string) => {
      return new Promise<ISignUpResult>((resolve, reject) => {
        UserPool.signUp(username, password,
          [
            new CognitoUserAttribute({
              Name: "email",
              Value: email,
            }),
          ], [],
          (error, data) => {
            if (error) {
              if (error.message.startsWith("PreSignUp failed with error")) {
                const modifiedErrorMessage = error.message.replace("PreSignUp failed with error", "").trim();
                toast({
                  variant: "destructive",
                  title: "Error.",
                  description: modifiedErrorMessage
                });
              }
              else{
                const modifiedErrorMessage = error.message
                toast({
                  variant: "destructive",
                  title: "Error.",
                  description: modifiedErrorMessage
                });
              }
              reject(error);
            } else if (data) {
              toast({
                title: `Email Confimration Required.`,
                description: `A verification code has been sent to ${email}. Please check your spam folder if you do not see it in your inbox.`,
              });
              setUser(data.user);
              resolve(data);
            }
          }
        );
      });
    },
    [toast]
  );
  const confirmSignUp = useCallback(
    async (username: string, code: string) => {
      return new Promise<any>((resolve, reject) => {
        const User = new CognitoUser({
          Username: username,
          Pool: UserPool,
        });
        User.confirmRegistration(code, true, (error, data) => {
          if (error) {
            toast({
              variant: "destructive",
              title: "Error.",
              description: error.message
            });
            reject(error);
          } else if (data) {
            toast({
              title: `Success!`,
              description: `You can now login with your account`,
            });
            resolve(data);
          }
        });
      });
    },
    [toast]
  );
  const resendConfirmationCode = useCallback(
    async (username: string) => {
      return new Promise<any>((resolve, reject) => {
        const User = new CognitoUser({
          Username: username,
          Pool: UserPool,
        });
        User.resendConfirmationCode((error, data) => {
          if (error) {
            toast({
              variant: "destructive",
              title: "Error.",
              description: error.message
            });
            reject(error);
          } else if (data) {
            toast({
              title: `Code Resent.`,
              description: `A new verification code has been sent to ${username}.`,
            });
            resolve(data);
          }
        });
      });
    },
    [toast]
  );
  const logIn = useCallback(
    async (username: string, password: string) => {
      return new Promise<CognitoUserSession>((resolve, reject) => {
        const User = new CognitoUser({
          Username: username,
          Pool: UserPool,
        });
        const authDetails = new AuthenticationDetails({
          Username: username,
          Password: password,
        });
        User.authenticateUser(authDetails, {
          onSuccess: (data) => {
            setUser(User);
            resolve(data);
          },
          onFailure: (error) => {
            toast({
              variant: "destructive",
              title: "Error.",
              description: error.message
            });
            reject(error);
          },
        });
      });
    },
    [toast]
  );
  const logOut = useCallback(() => {
  const User = UserPool.getCurrentUser();
    if (User) {
      User.signOut();
      setUser(null);
    }
  }, []);
  const getSession = useCallback(() => {
    return new Promise((resolve, reject) => {
      const User = UserPool.getCurrentUser();
      if (User){
        User.getSession(
          async (error: unknown, session: CognitoUserSession) => {
            if (error) {
              if(import.meta.env.VITE_ENV === 'development'){
                console.log("Error getting session: ", error);
              }
            } else {
              const attributes = await new Promise((resolve, reject) => {
                User.getUserAttributes((error, attributes) => {
                  if (error) {
                    reject(error);
                  } else {
                    const results: { [key: string]: string } = {};
                    if (attributes){
                      for (const attribute of attributes) {
                        const { Name, Value } = attribute;
                        results[Name] = Value;
                      }
                    }
                    resolve(results);
                  }
                });
              });
              const value = {
                username: User.getUsername(),
                session,
                attributes: attributes,
              };
              resolve(value);
            }
          }
        )
      } else {
        reject("No Session");
      }
    });
  }, []);
  const forgotPassword = useCallback((username: string) => {
    return new Promise((resolve, reject) => {
      const User = new CognitoUser({
        Username: username,
        Pool: UserPool,
      });
      User.forgotPassword({
        onSuccess: (data) => {
          toast({
            title: `Success!`,
            description: `A password reset code has been sent to ${username}.`,
          });
          resolve(data);
        },
        onFailure: (error) => {
          toast({
            variant: "destructive",
            title: "Error.",
            description: error.message
          });
          reject(error);
        },
      });
    });
  }, []);
  const passwordConfirm = useCallback((username: string, code: string, newPassword: string) => {
    return new Promise((resolve, reject) => {
      const User = new CognitoUser({
        Username: username,
        Pool: UserPool,
      });
      User.confirmPassword(code, newPassword, {
        onSuccess: (data) => {
          toast({
            title: `Success!`,
            description: `You can now login with your new password.`,
          });
          resolve(data);
        },
        onFailure: (error) => {
          toast({
            variant: "destructive",
            title: "Error.",
            description: error.message
          });
          reject(error);
        },
      });
    });
  }, []);

  const values = useMemo(() => ({ user, signUp, confirmSignUp, resendConfirmationCode, logIn, logOut, getSession, forgotPassword, passwordConfirm }), [user, signUp, confirmSignUp, resendConfirmationCode, logIn, logOut, getSession, forgotPassword, passwordConfirm]);
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
