'use client';

import React from 'react';

async function getRestaurants () {
  const res = await fetch('http://localhost:3000/api/db/restaurant');
  const data = await res.json();
  console.log('DATA', data);
}

async function getUsers () {
  const res = await fetch('http://localhost:3000/api/db/user');
  const data = await res.json();
  console.log('DATA', data);
}

async function getReviews () {
  const res = await fetch('http://localhost:3000/api/db/review');
  const data = await res.json();
  console.log('DATA', data);
}

async function getFollows () {
  const res = await fetch('http://localhost:3000/api/db/follow');
  const data = await res.json();
  console.log('DATA', data);
}

function Page () {
  return (
    <>
      <p onClick={getRestaurants}>Get all restaurants</p>
      <p onClick={getUsers}>Get all users</p>
      <p onClick={getReviews}>Get all reviews</p>
      <p onClick={getFollows}>Get all follows</p>
    </>
  );
}

export default Page;
