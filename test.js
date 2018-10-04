import { strictEqual as test } from 'assert'
import { Pure, PureComponent } from './index.js'

/* EXTEND PureComponent */
const BasicComponent = Pure(() => 'pouet')

// It should be an instanceof PureComponent
test(new BasicComponent instanceof PureComponent, true)

// The method render should return the output of the given function
test((new BasicComponent).render(), 'pouet')

const testProps = {}
const PropsComponent = Pure(props => props)

// The props should be passed untouched
test((new PropsComponent(testProps)).render(), testProps)


/* OPTION: Event */
let eventCalled = false
const EventComponent = Pure(() => {}, { withEvents: true })
const ec = new EventComponent({ onMount: () => eventCalled = true })
ec.componentDidMount()

// The event should call the given props
test(eventCalled, true)


/* OPTION: name */
// The created class should keep the name of the render function
test(Pure(function NameFromFunction() {}).name, 'NameFromFunction')

// Anonymous functions should have the name of the file calling `Pure`
test(Pure(() => {}).name, 'test')

// We can specify the name as an option, it will overide the render name
test(Pure(function NotThisName() {}, { name: 'ThisName' }).name, 'ThisName')


/* OPTION: classNames */
const ClassName = Pure(props => props, { classNames: [ 'b', 'c' ] })

// It will add a className property if not present
test((new ClassName({})).render().className, 'b c')

// It will concatenate the className with the given ones if present
test((new ClassName({ className: 'a' })).render().className, 'a b c')

// It will not de-dup classes, the dom takes care of that for use.
test((new ClassName({ className: 'b' })).render().className, 'b b c')


/* OPTION: classFlags */
const ClassFlags = Pure(props => props, {
  classFlags: { disabled: 'bp-disabled', selected: 'mySelect_class' }
})

// It will not add a className if we don't pass any flags
test((new ClassFlags({})).render().className, undefined)

// It will transform the first flag as his className
test((new ClassFlags({ disabled: true })).render().className, 'bp-disabled')

// It will transform the second flag as his className
test((new ClassFlags({ selected: true })).render().className, 'mySelect_class')

// It will transform both flag as one merged className
test((new ClassFlags({ disabled: true, selected: true })).render().className,
  'bp-disabled mySelect_class')

// It will merge flag classes with the given className
test((new ClassFlags({ selected: true, className: 'a' })).render().className,
  'a mySelect_class')

console.log('All OK')
