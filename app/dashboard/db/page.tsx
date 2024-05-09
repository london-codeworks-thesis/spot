'use client';

import React from 'react';

async function db () {
  console.log('clicked');
  const res = await fetch('http://localhost:3000/api/db');
  const data = await res.json();
  console.log('DATA', data);
}

function Page () {
  return <p onClick={db}>Get all restaurants</p>
}

export default Page;
