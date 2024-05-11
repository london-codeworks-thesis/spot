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

async function getPinned () {
  const res = await fetch('http://localhost:3000/api/db/follow');
  const data = await res.json();
  console.log('DATA', data);
}

function Page () {
  return (
    <>
      <button type='button' onClick={getRestaurants}>
        Get all restaurants
      </button>
      <button type='button' onClick={getUsers}>
        Get all users
      </button>
      <button type='button' onClick={getReviews}>
        Get all reviews
      </button>
      <button type='button' onClick={getFollows}>
        Get all follows
      </button>
      <button type='button' onClick={getPinned}>
        Get restaurants pinned for Sunny
        {' '}
      </button>
    </>
  );
}

export default Page;
