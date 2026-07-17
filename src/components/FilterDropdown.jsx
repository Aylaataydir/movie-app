'use client'

import { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const FilterDropdown = ({ icon: Icon, options, selected, onSelect, placeholder = 'All', className = '' }) => {

    const [open, setOpen] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedLabel = options.find(o => o.id === selected)?.label || placeholder

    const handleSelect = (id) => {
        onSelect(id)
        setOpen(false)
    }

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="flex w-full items-center justify-between gap-2 rounded-full bg-base-content/5 px-3 py-1.5 text-sm text-base-content ring-1 ring-base-content/10 transition-colors focus:outline-none focus-visible:ring-orange-500/60"
            >
                <span className="flex min-w-0 items-center gap-2">
                    {Icon && <Icon className="h-3 w-3 shrink-0 text-base-content/50" />}
                    <span className="truncate">{selectedLabel}</span>
                </span>
                <FaChevronDown className={`h-3 w-3 shrink-0 text-base-content/50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-2 max-h-80 w-40 overflow-y-auto rounded-xl border border-base-content/10 bg-base-200 shadow-2xl">
                    <button
                        type="button"
                        onClick={() => handleSelect(null)}
                        className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-base-content/5 ${!selected ? 'font-semibold text-orange-400' : 'text-base-content/70'}`}
                    >
                        {placeholder}
                    </button>
                    {options.map(option => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSelect(option.id)}
                            className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-base-content/5 ${selected === option.id ? 'font-semibold text-orange-400' : 'text-base-content/70'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilterDropdown
