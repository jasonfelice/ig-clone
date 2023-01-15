const errorHandler = (code) => {
  switch (code) {
    case ('auth/email-already-in-use'):
      return { type: 'warning', message: 'Email address already in use! Please choose a different email address.' };
    case ('auth/weak-password'):
      return { type: 'warning', message: 'Please choose a strong password.' };
    case ('auth/invalid-email'):
      return { type: 'error', message: 'Please enter a correct email address.' };
    case ('auth/user-not-found'):
      return { type: 'error', message: 'Incorrect password, please try again!' };
    case ('auth/wrong-password'):
      return { type: 'error', message: 'Incorrect password, please try again!' };
    default: return { type: 'error', message: 'Uh oh, something went wrong. Please try again later!' };
  }
}

export default errorHandler;
