import './App.css';

function App() {
  return (
    <div className="App">
      <form>
        <div>
          <label htmlFor='email'>Email address </label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
