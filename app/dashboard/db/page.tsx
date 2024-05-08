import React from 'react';

async function db () {
  const res = await fetch('http://localhost:3000/api/db');
  const data = await res.json();
  console.log('DATA', data);
}

db();

function Page () {
  return <p>DB Page</p>;
}

export default Page;
