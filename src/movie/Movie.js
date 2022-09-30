
import BasicGrid from "./BasicGrid"
import PaginationRounded from "./Paginations"


export const Movie = ()=>{



    const images = [
        'https://img.seadn.io/files/83f11d2ed6ad9e33692ebbd512c31b78.png?auto=format&fit=max&w=3840',
        'https://img.seadn.io/files/f711a7d1245f6d292a43b508b4f49778.png?auto=format&fit=max&w=3840',
        'https://img.seadn.io/files/d2c11e5e6ec2a578b7a2642c9cad2985.png?auto=format&fit=max&w=3840',
        'https://img.seadn.io/files/04a96267039e29988f7a97b0ac591425.png?auto=format&fit=max&w=3840',
        'https://img.seadn.io/files/0767fdc6813f42cac427a30d9dde5dce.png?auto=format&fit=max&w=3840',
        'https://img.seadn.io/files/2f2fbf1aaf91bde16cb7af5f8a34e143.png?auto=format&fit=max&w=3840'
    ]

    return (
        <div>
            <ul>
                {images.map(
                    (image, index) => {
                        return (<li key={index}><BasicGrid image={image}/></li>)
                    }
                )}
            </ul>
            
        </div>
    )
}