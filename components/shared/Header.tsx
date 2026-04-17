"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, X, ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { transformImageUrl } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout, isLoading } = useAuth();

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setMobile(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 FIX: Reset dropdown when logout
  useEffect(() => {
    if (!isLoggedIn) {
      setOpen(false);
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    setOpen(false); // ✅ important fix
    await logout();
    router.push("/");
  };

  const displayName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "Account";

  const avatarSrc =
    transformImageUrl(user?.profile_image) || "/assets/images/profile.jpeg";

  return (
    <header className="w-full border-b border-border text-xs md:text-sm backdrop-blur-[14px] sticky top-0 z-50 bg-secondary/80">
      <div className="mx-auto h-18 flex items-center justify-between px-4 md:px-10">
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMobile(!mobile)}>
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Left nav — desktop */}
        <div className="hidden md:flex gap-8 text-muted font-medium text-sm">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/discover" className="hover:text-primary">
            Discover
          </Link>
          <Link href="/works" className="hover:text-primary">
            How it Works
          </Link>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-3xl xl:text-[40px] font-bold tracking-wide text-primary montserrat"
        >
          FoReal
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-4 relative" ref={dropdownRef}>
          {/* Wishlist */}
          <Link href="/wishlist">
            <Heart className="w-5 h-5 text-muted-foreground hover:text-primary" />
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <ShoppingBag className="w-5 h-5 text-muted-foreground hover:text-primary" />
          </Link>

          <div className="hidden md:block w-px h-6 bg-border" />

          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-border animate-pulse" />
          ) : isLoggedIn ? (
            <>
              {/* Profile */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Image
                  src={avatarSrc}
                  width={32}
                  height={32}
                  alt={displayName}
                  className="rounded-full h-8 w-8 object-cover"
                />
                <span className="hidden md:block text-sm font-medium text-muted">
                  {displayName}
                </span>
              </div>

              {/* Logged-in dropdown */}
              {open && isLoggedIn && (
                <div className="absolute right-0 top-12 w-52 bg-white border shadow-md z-50">
                  <div className="p-4 border-b">
                    <p className="text-xs text-muted">SIGNED IN AS</p>
                    <p className="font-medium">{displayName}</p>
                    <p className="text-xs truncate">{user?.email}</p>
                  </div>

                  <Link href="/profile" className="block px-4 py-3 hover:bg-gray-50">
                    View Profile
                  </Link>
                  <Link href="/wishlist" className="block px-4 py-3 hover:bg-gray-50">
                    Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* 🔥 NOT LOGGED IN UI (like your screenshot) */}
              <div
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <User className="w-5 h-5 text-muted-foreground" />
              </div>

              {open && !isLoggedIn && (
                <div className="absolute right-0 top-12 w-48 bg-white shadow-lg z-50 text-[12.48px]">
                  <p className="p-4  text-muted">
                    Sign in to rent, save, and post pieces.
                  </p>
                  <Link
                    href="/auth/login"
                    className="block px-4 py-3 font-semibold hover:bg-gray-50 text-muted"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-3 hover:bg-gray-50"
                  >
                    Create account
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="md:hidden border-t bg-background">
          <Link href="/" className="block px-4 py-3 border-b">
            Home
          </Link>
          <Link href="/discover" className="block px-4 py-3 border-b">
            Discover
          </Link>
          <Link href="/works" className="block px-4 py-3 border-b">
            How it Works
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/profile" className="block px-4 py-3 border-b">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block px-4 py-3 border-b">
                Sign In
              </Link>
              <Link href="/auth/register" className="block px-4 py-3">
                Join
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}