import CreatePackage from "../components/CreatePackage";

export default function CreatePackagePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create New Package
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Fill in the details below to create a new premade package
            </p>
          </div>
          <CreatePackage />
        </div>
      </div>
    </main>
  );
} 