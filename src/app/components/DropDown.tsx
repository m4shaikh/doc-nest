import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="absolute right-2 top-2 cursor-pointer" ref={menuRef}>
            {/* Menu Icon / Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="focus:outline-none "
            >
                <Image src='./assets/icons/dots.svg' height={0} width={0} alt='' className='w-4.5 h-4.5 ' />

            </button>

            {/* Dropdown Menu Content */}
            {isOpen && (
                <div className="absolute left-0 top-6 w-32 bg-popover border border-border shadow-lg rounded-xl p-1 z-50 flex flex-col gap-1">
                    <button className="text-left text-xs p-1.5 hover:bg-muted rounded">
                        Download
                    </button>
                    <button className="text-left text-xs p-1.5 hover:bg-muted rounded">
                        Rename
                    </button>
                    <button className="text-left text-xs text-red-500 p-1.5 hover:bg-muted rounded">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default DropDown;