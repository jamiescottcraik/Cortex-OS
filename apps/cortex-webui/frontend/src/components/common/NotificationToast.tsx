'use client';

import type React from 'react';
import { useEffect } from 'react';

interface NotificationToastProps {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	onClose: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ id, type, message, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose(id);
		}, 5000);

		return () => clearTimeout(timer);
	}, [id, onClose]);

	const getTypeStyles = () => {
		switch (type) {
			case 'success':
				return 'bg-green-500 text-white';
			case 'error':
				return 'bg-red-500 text-white';
			case 'warning':
				return 'bg-yellow-500 text-black';
			case 'info':
				return 'bg-blue-500 text-white';
			default:
				return 'bg-gray-500 text-white';
		}
	};

	const getIcon = () => {
		switch (type) {
			case 'success':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="size-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case 'error':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="size-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case 'warning':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="size-5"
					>
						<path
							fillRule="evenodd"
							d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case 'info':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="size-5"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
							clipRule="evenodd"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div
			className={`flex items-start p-4 rounded-lg shadow-lg max-w-md ${getTypeStyles()} transition-all duration-300 ease-in-out transform hover:scale-105`}
		>
			<div className="flex-shrink-0 mr-3">{getIcon()}</div>
			<div className="flex-1">
				<p className="text-sm font-medium">{message}</p>
			</div>
			<button
				onClick={() => onClose(id)}
				className="flex-shrink-0 ml-4 text-white hover:text-gray-200 focus:outline-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="size-5"
				>
					<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
				</svg>
			</button>
		</div>
	);
};

export default NotificationToast;
