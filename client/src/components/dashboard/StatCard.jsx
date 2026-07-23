export default function StatCard({

title,

value,

icon,

color

}){

return(

<div
className="
rounded-2xl
shadow
bg-white
p-6
flex
justify-between
items-center
">

<div>

<p className="text-gray-500">
{title}
</p>

<h2 className="text-3xl font-bold mt-2">
{value}
</h2>

</div>

<div
className={`
text-4xl
${color}
`}
>

{icon}

</div>

</div>

)

}