import { Menu, Transition } from '@headlessui/react'

 export function MyDropdown() {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button>More</Menu.Button>

          {/* Use the `Transition` component. */}
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {/* Mark this component as `static` */}
            <Menu.Items static>
              <Menu.Item>{/* ... */}</Menu.Item>
              {/* ... */}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}