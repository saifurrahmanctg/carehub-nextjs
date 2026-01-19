export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary font-bold">CH</span>
        </div>
      </div>
      <p className="mt-4 text-primary font-medium animate-pulse">Loading CareHub...</p>
    </div>
  );
}
