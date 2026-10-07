function Header(probs) {
  const nameofApp = "React APP";

  return (
    <div>
      <h1>{nameofApp}</h1>
      <p>Welcome {probs.name}</p>
    </div>
  )
}

export default Header;