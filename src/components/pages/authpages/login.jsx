import '../../pages/global.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { useState } from 'react'; // <-- adjust path to your Firebase config

export default function AuthPage() {
  const navigate = useNavigate();
  const isLogin = window.location.pathname === "/";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('jobseeker');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let userCred;
      let roleToNavigate;
  
      if (isLogin) {
        // LOGIN
        userCred = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCred.user.uid;
  
        const rolesToCheck = ['admin', 'jobseeker', 'companies'];
        for (const roleKey of rolesToCheck) {
          const roleDoc = await getDoc(doc(db, roleKey, uid));
          if (roleDoc.exists()) {
            roleToNavigate = roleKey;
            break;
          }
        }
  
        if (!roleToNavigate) {
          throw new Error("User role not found.");
        }
  
        // Navigation logic after login
        if (roleToNavigate === 'admin') {
          navigate('/admindashboard');
        } else if (roleToNavigate === 'companies') {
          // Check if company data exists
          const companyDoc = await getDoc(doc(db, 'companies', uid));
          if (companyDoc.exists() && companyDoc.data().companyName) {
            navigate('/companydashboard'); // Already registered
          } else {
            navigate('/registercompany'); // Needs to fill details
          }
        } else {
          navigate('/home');
        }
  
      } else {
        // SIGN UP
        const validRoles = ['admin', 'jobseeker', 'companies'];
        if (!validRoles.includes(role)) {
          throw new Error('Invalid role selected.');
        }
  
        userCred = await createUserWithEmailAndPassword(auth, email, password);
  
        const userData = {
          uid: userCred.user.uid,
          name: username,
          email: email,
          role: role,
          createdAt: new Date(),
        };
  
        await setDoc(doc(db, role, userCred.user.uid), userData);
  
        // Immediate redirect after sign-up
        if (role === 'admin') {
          navigate('/admindashboard');
        } else if (role === 'companies') {
          navigate('/registercompany'); // New companies go here
        } else {
          navigate('/home');
        }
      }
  
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };
  

  return (
    <div className="container">
      <div className="wrapper">
        {/* Left Section */}
        <div className="left">
          <div className="brand">
            <h1 className="title">TalentHive</h1>
          </div>
          <div className="imagelogin">
            <img src={"./assets/Job-offers-bro.png"} alt="TalentHive Logo" className="brand-logo" />
          </div>
          {!isLogin && (
            <>
              <p className="description">
                TalentHive – Connect, hire, and apply with ease. <br />
                AI-powered resume builder and seamless job posting in one platform!
              </p>
              <div className="buttons">
                <button className="btn">What to Expect?</button>
              </div>
            </>
          )}
        </div>

        {/* Right Section - Auth Form */}
        <div className="form">
          <div className="content">
            <h2 className="heading">{isLogin ? "Log in to TalentHive" : "Sign up for TalentHive"}</h2>
            <form className="fields" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="field">
                    <label htmlFor="username">Your Name</label>
                    <input
                      id="username"
                      placeholder="John Doe"
                      type="text"
                      className="input-field"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="role">Select Role</label>
                    <select
                      id="role"
                      className="input-field"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="admin">Admin</option>
                      <option value="jobseeker">Job Seeker</option>
                      <option value="companies">Company</option>
                    </select>
                  </div>
                </>
              )}

              <div className="field">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email"
                  placeholder="thisisatest@gmail.com"
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="password">Your Password</label>
                <input
                  id="password"
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="options">
                <div className="remember">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                {isLogin && <a href="#" className="forgot">Forgot?</a>}
              </div>

              <button type="submit" className="submit">
                {isLogin ? "Log in" : "Sign up"}
              </button>

              <p className="signup">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <a href={isLogin ? "/signup" : "/"}>
                  {isLogin ? "Sign up" : "Log in"}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
