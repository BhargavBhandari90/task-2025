// Entry for editor scripts. Import block implementations.
// Blocks will be scaffolded into src/blocks/* and imported here.

require( '../blocks/advanced-slider' );
require( '../blocks/slide-item' );

import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	RichText,
	MediaUpload,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { createElement, Fragment, useEffect } from '@wordpress/element';

// Slide Item Block
registerBlockType( 'task-2025/slide-item', {
	title: 'Slide Item',
	icon: 'index-card',
	category: 'widgets',
	supports: { reusable: false },
	attributes: {
		iconUrl: { type: 'string', default: '' },
		title: { type: 'string', default: '' },
		description: {
			type: 'string',
			source: 'html',
			selector: '.slide-item__desc',
		},
	},
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const blockProps = useBlockProps( { className: 'slide-item' } );
		return (
			<div { ...blockProps }>
				<div className="slide-item__icon">
					<MediaUpload
						onSelect={ ( media ) =>
							setAttributes( { iconUrl: media.url } )
						}
						allowedTypes={ [ 'image' ] }
						render={ ( { open } ) => (
							<Button onClick={ open } variant="secondary">
								{ attributes.iconUrl
									? 'Change Icon'
									: 'Upload Icon' }
							</Button>
						) }
					/>
					{ attributes.iconUrl && (
						<img src={ attributes.iconUrl } alt="" />
					) }
				</div>
				<RichText
					tagName="h4"
					value={ attributes.title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					placeholder="Slide title"
				/>
				<RichText
					tagName="div"
					multiline={ [ 'p', 'li' ] }
					className="slide-item__desc"
					value={ attributes.description }
					onChange={ ( value ) =>
						setAttributes( { description: value } )
					}
					placeholder="Description (p or list)"
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/list',
					] }
				/>
				<InspectorControls>
					<PanelBody title="Slide Settings"></PanelBody>
				</InspectorControls>
			</div>
		);
	},
	save: ( { attributes } ) => {
		const blockProps = useBlockProps.save( { className: 'slide-item' } );
		return (
			<div { ...blockProps }>
				{ attributes.iconUrl && (
					<img
						className="slide-item__icon"
						src={ attributes.iconUrl }
						alt=""
					/>
				) }
				<RichText.Content tagName="h4" value={ attributes.title } />
				<div
					className="slide-item__desc"
					dangerouslySetInnerHTML={ {
						__html: attributes.description || '',
					} }
				/>
			</div>
		);
	},
} );

// Advanced Slider Block
registerBlockType( 'task-2025/advanced-slider', {
	title: 'Advanced Slider',
	icon: 'grid-view',
	category: 'widgets',
	supports: { reusable: false },
	attributes: {
		hasNav: { type: 'boolean', default: false },
	},
	edit: ( props ) => {
		const { attributes, setAttributes, clientId } = props;
		const blockProps = useBlockProps( { className: 'slider-wrapper' } );

		const innerCount = useSelect(
			( select ) => {
				const block =
					select( 'core/block-editor' ).getBlock( clientId );
				if ( ! block ) return 0;
				return ( block.innerBlocks || [] ).filter(
					( b ) => b.name === 'task-2025/slide-item'
				).length;
			},
			[ clientId ]
		);

		const hasNav = innerCount > 5;

		useEffect( () => {
			if ( attributes.hasNav !== hasNav ) {
				setAttributes( { hasNav } );
			}
		}, [ hasNav ] );

		return (
			<div
				{ ...blockProps }
				className={
					hasNav ? 'slider-wrapper has-more-than-5' : 'slider-wrapper'
				}
			>
				<div className="slider-grid">
					<InnerBlocks
						allowedBlocks={ [ 'task-2025/slide-item' ] }
						template={ [
							[ 'task-2025/slide-item' ],
							[ 'task-2025/slide-item' ],
						] }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
				{ hasNav && (
					<div className="slider-nav">
						<Button variant="secondary">Prev</Button>
						<Button variant="secondary">Next</Button>
					</div>
				) }
			</div>
		);
	},
	save: ( { attributes } ) => {
		const { hasNav } = attributes;
		const blockProps = useBlockProps.save( {
			className: hasNav
				? 'slider-wrapper has-more-than-5'
				: 'slider-wrapper',
		} );
		return (
			<div { ...blockProps }>
				<div className="slider-grid">
					<InnerBlocks.Content />
				</div>
				{ hasNav && (
					<div className="slider-nav">
						<button type="button">Prev</button>
						<button type="button">Next</button>
					</div>
				) }
			</div>
		);
	},
} );
