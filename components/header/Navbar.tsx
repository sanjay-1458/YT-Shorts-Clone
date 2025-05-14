"use client"
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center h-14 border-b border-gray-700 justify-between">
      {/* Logo */}
      <div>
        <h1 className="font-bold text-xl">
          YT <span className="text-pink-500">Shorts</span>
        </h1>
      </div>
      {/* Input field */}
      <div className="w-1/3">
        <Input type="text" placeholder="Search..." />
      </div>
      {/* Accounts */}
      <div className="flex items-center space-x-2">
        <Link href="/upload">
          <Button>
            <Plus />
            Create
          </Button>
        </Link>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
